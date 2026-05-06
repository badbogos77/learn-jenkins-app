pipeline {
    agent any

    stages {
        stage('Hello') {
            agent {
                docker {
                    image: 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -al
                    npm --version
                    docker --version
                    npm ci
                    npm run build
                    ls -al
                '''
            }
        }
    }
}