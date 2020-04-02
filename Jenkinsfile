pipeline {
	agent any
	stages {
		stage('checkout') {
			checkout scm
		}
		stage('test') {
			sh "make check"
		}
		stage('artifacts') {
			sh "make dist packages/webapps.e/dist"
		}
	}

	post {
		success {
			archiveArtifacts artifacts: 'dist/**/*,packages/webapps.e/dist/**/*', fingerprint: true
		}
	}
}
