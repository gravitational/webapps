pipeline {
	agent any

	stages {
		stage('test') {
			steps {
				sh "make clean init-submodules check"
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
