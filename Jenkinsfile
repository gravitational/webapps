pipeline {
	agent any

	options {
		skipDefaultCheckout(true)
	}

	stages {
		stage('checkout') {
			steps {
				sh "git submodule deinit --all --force"
				checkout scm
			}
		}
		stage('test') {
			steps {
				sh "make check"
			}
		}
		stage('artifacts') {
			steps {
				sh "make dist packages/webapps.e/dist"
			}
		}
	}

	post {
		success {
			archiveArtifacts artifacts: 'dist/**/*,packages/webapps.e/dist/**/*', fingerprint: true
		}
	}
}
