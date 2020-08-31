#!"C:\Python37\python.exe"
print("Content-type: text/html ; charset=iso-8859-1\n\n")

import os
import pathlib
from pathlib import Path
def getfile(file):
	destdir = file
	return os.listdir(destdir)

def removex(txt):
	txt = str(txt)
	if(txt.find(r"C:\xampp\htdocs") != -1):
		txt = txt.replace(r"C:\xampp\htdocs","\\")
		return txt
	else:
		return "\\"
files = getfile(pathlib.Path(__file__).parent.absolute())
print("""<html>
    <head>
    <title>%s output - %s</title>
    </head>
    <body>
	""")
for i in files:
	print("<div class='list'><a href='" + i + "'>" + i +"</a></div>")
print("""</body></html>""")
print("<a href='" + removex(Path(__file__).resolve().parents[1]) + "' > einen ordner nach oben</a>")