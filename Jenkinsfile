pipeline {
    agent any
    environment {
       GIT_REPO = 'PA_202510_G83_E1_Front'
       GIT_CREDENTIAL_ID = '7c21addc-0cbf-4f2e-9bd8-eced479c56c6'
       SONARQUBE_URL = 'http://172.24.100.52:8082/sonar-isis2603'
       SONAR_TOKEN = credentials('sonar-login')
    }
    stages {
       stage('Checkout') {
          steps {
             scmSkip(deleteBuild: true, skipPattern:'.*\\[ci-skip\\].*')
             git branch: 'main',
                credentialsId: env.GIT_CREDENTIAL_ID,
                url: 'https://github.com/UDFJDC-ProgramacionAvanzada/' + env.GIT_REPO
          }
       }
       stage('Build') {
          // Build app
          steps {
             script {
                docker.image('nodetools-isis2603:latest').inside('-u root') {
                   sh '''
                      npm i -s
                      npm run build
                   '''
                }
             }
          }
       }
      stage('Test') {
          steps {
             script {
                docker.image('nodetools-isis2603:latest').inside('-u root') {
                   sh '''
                      CI=true npm run test -- --coverage .
                   '''
                }
             }
          }
       }
       stage('Static Analysis') {
          // Run static analysis
          steps {
             sh '''
                docker run --rm -u root -e SONAR_HOST_URL=${SONARQUBE_URL} -e SONAR_TOKEN=${SONAR_TOKEN} -v ${WORKSPACE}:/usr/src sonarsource/sonar-scanner-cli
             '''
          }
       }
    }
    post {
       always {
          // Clean workspace
          cleanWs deleteDirs: true
       }
    }
  }