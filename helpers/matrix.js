function Matrix(iMax, jMax, kMax){
	var matrix = new Array()
	for (i=0;i<iMax;i++) {
		matrix[i]=new Array();
		for (j=0;j<jMax;j++) {
			matrix[i][j]=0;
			if(kMax){
				for (k=0;k<kMax;k++) {
					matrix[i][j][k]=0;
				}
			}
		}
	}

	return matrix
}