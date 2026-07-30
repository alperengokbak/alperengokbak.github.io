pipeline {
    agent any

    stages {
        stage('Build') {
          agent {
            docker {
              // Must satisfy the engines range in package.json (Vite 7 needs Node
              // ^20.19 || >=22.12). node:18 could not build this project.
              image 'node:20-alpine'
              reuseNode true
            }
          }
            steps {
                sh '''
                    npm --version
                    npm ci
                    npm run lint
                    npm run test:run
                    npm run build
                '''
            }
        }
    }
}
