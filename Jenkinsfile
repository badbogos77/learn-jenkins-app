pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.39.0-jammy'
            reuseNode true
        }
    }

    environment {
        NETLIFY_SITE_ID = 'f4caafce-ed4d-441f-ab6a-a92e9b8bcb41'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }

    stages {
        stage('Build') {            
            steps {
                sh '''
                    ls -al
                    npm --version
                    node --version
                    npm ci
                    npm run build
                    ls -al
                '''
            }
        }

        stage('Test') {
            steps {
                echo 'Test stage'
                sh '''
                test -f build/index.html
                npm test
                '''
            }
        }

        stage('E2E') {
            steps {
                sh '''
                npm install serve
                node_modules/.bin/serve -s build & sleep 10
                npx playwright test
                '''
            }
        }

        stage('deploy') {
            steps {
                sh '''
                npm install netlify-cli@20.1.1
                node_modules/.bin/netlify --version
                echo "프로젝트 배포중 .. 사이트 아이디 : $NETLIFY_SITE_ID"
                node_modules/.bin/netlify status
                node_modules/.bin/netlify deploy --dir=build --prod
                '''
            }
        }
    }

    post {
        always {
            junit 'jest-results/junit.xml'
        }
    }
}