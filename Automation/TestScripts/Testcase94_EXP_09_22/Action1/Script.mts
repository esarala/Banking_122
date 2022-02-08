'###################################################################################################################
'Test Script Name: Testcase94_EXP_09_22
'Script Description: Testcase94_EXP_09_22
'Designed By Date: Chetan
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase94_EXP_09_22"

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
		intBagReference = DataTable.Value("BagReference")
		intAmount = DataTable.Value("Amount")
		strJustification = DataTable.Value("Justification")
		
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
If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
Else
	Call LoginXstore(strLoginType,strUsername,strPassword)
	wait 1
End If

Call Testcase94_EXP_09_22()

Call Logout(strLoginType)

On Error GoTo 0
ExitRun

Function Testcase94_EXP_09_22()

Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu_old").Select "#6"
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu_old").Select "#3"
Wait 1


Set WshShell = CreateObject("WScript.Shell")
Wait 1
WshShell.SendKeys"{DOWN}"
Wait 1
WshShell.SendKeys"{DOWN}"
Wait 1
WshShell.SendKeys"{DOWN}"
Wait 1
WshShell.SendKeys"{DOWN}"
Wait 1
WshShell.SendKeys"{DOWN}"

'validate Back button
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Exist(3) Then
	Reporter.ReportEvent micPass,"Banking","Back button successfully"
	Else
	Reporter.ReportEvent micFail,"Banking","Back button validated  Usuccessfully"
End If

'Validate update float management button 
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Update Float Amount").Exist(2) Then
	Reporter.ReportEvent micPass,"Banking","Update Float Amount button validated  successfully"
	Else
	Reporter.ReportEvent micFail,"Banking","Update Float Amount button validated  successfully"
End If


Set WshShell = CreateObject("WScript.Shell")
WshShell.SendKeys"{DOWN}"

If JavaWindow("Oracle Retail Xstore Point").JavaButton("Disable Cash").Exist(2) Then
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Disable Cash").Click
	Reporter.ReportEvent micPass,"Banking","Disable cash button validated  successfully"
	Else
	Reporter.ReportEvent micFail,"Banking","Disable cash button validated  successfully"
End If

Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
'Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
'Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
WshShell = Nothing

End Function
