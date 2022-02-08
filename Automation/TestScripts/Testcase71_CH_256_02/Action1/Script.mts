'###################################################################################################################
'Test Script Name: Testcase71_CH_256_02
'Script Description: Testcase71_CH_256_02
'Designed By Date: Amrutha
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase71_CH_256_02"

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
	wait 1
'End If

JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#6"
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#6"
Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
'Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("Count Complete").Click
Wait(2)
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Exist(3) Then
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
	Reporter.ReportEvent micPass,"Banking Midday","Midday declaration Confirmation window is validated  successful"
Else
	Reporter.ReportEvent micFail,"Banking Midday","Midday declaration confirmation window is validated Unsuccessful"
End If
If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Exist(3) Then
	Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
End If

Call Logout(strLoginType)

On Error GoTo 0
ExitRun
