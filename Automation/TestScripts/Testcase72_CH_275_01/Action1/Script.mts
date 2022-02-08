'###################################################################################################################
'Test Script Name: Testcase72_CH_275_01
'Script Description: Testcase72_CH_275_01
'Designed By Date: Amrutha
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase72_CH_275_01"

DataTable.Import DataFilePath
Wait(3)
iRowCount = DataTable.GetSheet(1).GetRowCount
For i=1 to iRowCount
	DataTable.SetCurrentRow(i)
	CurrentTestCaseName = DataTable.Value("TCName")
	If Instr(1,CurrentTestCaseName,TestScriptName,0)>0 Then
		strLoginType = DataTable.Value("LoginType")
		strUsername = DataTable.Value("UserName")
		strPassword = DataTable.Value("Password")
		Exit For
	End If
Next
	
'Using for jenkins
strScriptLoc="Local"
TestScriptRootPath=Environment.Value("TestDir")
spath=Split(TestScriptRootPath,"\")
If strScriptLoc="Local" Then
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)
Else
	DirPath=spath(0)&"\"&spath(1)&"\"&spath(2)&"\"&spath(3)&"\"&spath(4)&"\"&spath(5)&"\"&spath(6)&"\"&spath(7)&"\"&spath(8)&"\"&spath(9)&"\"&spath(10)
End If

'loading object repositories and library files
Repositoriescollection.Add DirPath&"\ObjectRepository\MasterRepository.tsr"
LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\Banking.qfl"

wait (2)
'If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
'	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
'Else
	Call LoginXstore(strLoginType,strUsername,strPassword)
	wait 2
'End If

JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#6"
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#3"
'validate Back button
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Exist(3) Then
	Reporter.ReportEvent micPass,"Back button","Back button successfully"
Else
	Reporter.ReportEvent micFail,"Back button","Back button validated  Usuccessfully"
End If

'Validate update float management button 
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Update Float Amount").Exist(2) Then
	Reporter.ReportEvent micPass,"Update Float Amount button","Update Float Amount button validated  successfully"
Else
	Reporter.ReportEvent micFail,"Update Float Amount button","Update Float Amount button validated  successfully"
End If
'Validate Enable cash button 
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Enable Cash").Exist(3) Then
	Reporter.ReportEvent micPass,"Enable Cash","Enable Cash validated  successfully"
Else
	Reporter.ReportEvent micFail,"Enable Cash","Enable Cash validated  Unsuccessfully"
End If
'Validate disable cash button 
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Disable Cash").Exist(3) Then
	Reporter.ReportEvent micPass,"Disable Cash","Disable Cash validated  successfully"
Else
	Reporter.ReportEvent micFail,"Disable Cash","Disable Cash validated  Unsuccessfully"
End If


Call Logout(strLoginType)

On Error GoTo 0
ExitRun
