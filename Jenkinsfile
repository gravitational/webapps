node {
	stage('checkout') {
		checkout scm
	}
	stage('test') {
		sh "make test"
	}
}
