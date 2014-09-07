function Matrix(iMax, jMax){
	var matrix = new Array()
	for (i=0;i<iMax;i++) {
	 matrix[i]=new Array();
	 for (j=0;j<jMax;j++) {
	  matrix[i][j]=0;
	 }
	}

	return matrix
}