pipeline {
    agent any

    stages {
        stage('Build') {
          agent {
            docker {
              image 'node:18-alpine'
              reuseNode true
            }
          }
            steps {
                sh '''
                    ls -l
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }
    }
}
