pipeline {
  agent any

  tools { nodejs 'NodeJS-18' }

  stages {
    stage('Checkout Code') {
      steps { checkout scm }
    }
    stage('Install Dependencies') {
      steps { sh 'npm ci || npm install' }
    }
    stage('Run Unit Tests') {
      steps { sh 'npm run test:unit' }
    }
    stage('Run Integration Tests') {
      steps { sh 'npm run test:integration' }
    }
    stage('Generate Reports') {
      steps { sh 'npm run test:report || true' }
      post {
        always {
          publishHTML(target: [
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports',
            reportFiles: 'test-report.html',
            reportName: 'Mocha Test Report'
          ])
        }
      }
    }
  }

  post {
    success { echo 'Build SUCCESS — all tests passed.' }
    failure { echo 'Build FAILED — check logs.' }
    always  { echo 'Pipeline finished.' }
  }
}
