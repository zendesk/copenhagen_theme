IF [%1]==[] (
	ECHO Input a product
	EXIT 1
)

SET PRODUCT=%1

copy manifest_%PRODUCT%.json manifest.json
copy styles\_variables_%PRODUCT%.scss styles\_variables.scss
copy styles\index_%PRODUCT%.scss styles\index.scss
copy assets\favicon_%PRODUCT%.ico settings\favicon.ico
copy assets\logo_%PRODUCT%.png settings\logo.png
copy assets\homepage_background_%PRODUCT%.jpg settings\homepage_background_image.jpg
