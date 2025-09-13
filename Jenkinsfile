pipeline {
  agent any
  environment {
    DOCKER_IMAGE    = 'portfolio'
    DOCKER_REGISTRY = 'ghcr.io/bhadri01'
  }

  stages {
    stage('Checkout') {
      when { branch 'main' }
      steps {
        git branch: 'main',
            credentialsId: 'GITHUB_SECRET',
            url: 'ghcr.io/bhadri01/portfolio:latest'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE .'
      }
    }

    stage('Login to Registry') {
      steps {
        withCredentials([usernamePassword(
          credentialsId:   'GITHUB_SECRET',
          usernameVariable: 'USERNAME',
          passwordVariable: 'PASSWORD'
        )]) {
          sh 'echo $PASSWORD | docker login $DOCKER_REGISTRY -u $USERNAME --password-stdin'
        }
      }
    }

    stage('Push') {
      steps {
        sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:latest'
      }
    }
    stage('RUN') {
      steps {
        sh 'docker compose -p bhadri-portfolio up -d'
      }
    }
  
  }

  post {
    always {
      echo "Pipeline finished at ${new Date().format("yyyy-MM-dd HH:mm:ss")}"
    }
    success {
      echo "✅ Build succeeded! Image pushed: ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest"
    }
    failure {
      echo "❌ Build failed!"
    }
  }
}