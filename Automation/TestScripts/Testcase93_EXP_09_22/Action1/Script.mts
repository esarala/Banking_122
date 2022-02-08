'###################################################################################################################
'Test Script Name: Testcase93_EXP_09_22
'Script Description: Testcase93_EXP_09_22
'Designed By Date: Chetan
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase93_EXP_09_22"

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

Call Testcase93_EXP_09_22(intBagReference,intAmount,strJustification)

Call Logout(strLoginType)

On Error GoTo 0
ExitRun

Function Testcase93_EXP_09_22(intBagReference,intAmount,strJustification)

JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#6"
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#0"
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
wait 2
Set WshShell1 = CreateObject("WScript.Shell")

WshShell1.SendKeys"{ENTER}"
Wait(2)
WshShell1.SendKeys"{DOWN}"
wait 1
WshShell1.SendKeys"{DOWN}"
wait 1
WshShell1.SendKeys"{DOWN}"
wait 1
WshShell1.SendKeys"{DOWN}"
wait 1
WshShell1.SendKeys"{DOWN}"
wait 1
JavaWindow("Oracle Retail Xstore Point").JavaButton("Auto Declare").Click
Wait(2)
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Exist(3) Then
	Wait(2)
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
	Wait(2)
	JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
	Reporter.ReportEvent micPass,"Banking Autodeclare confirmation","Autodeclare confirmation message confirmed"
Else
	Reporter.ReportEvent micFail,"Banking Autodeclare confirmation","Autodeclare confirmation message not displayed"
End If 


RunAction "Action1 [Registeropen]", oneIteration

End Function
