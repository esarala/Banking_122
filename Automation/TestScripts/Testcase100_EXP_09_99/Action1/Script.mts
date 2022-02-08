'###################################################################################################################
'Test Script Name: Testcase100_EXP_09_99
'Script Description: Testcase100_EXP_09_99
'Designed By Date: Chetan
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase100_EXP_09_99"

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

Call LoginXstore(strLoginType,strUsername,strPassword)
wait 1

Call Testcase100_EXP_09_99()

Call Logout(strLoginType)

On Error GoTo 0
ExitRun


'JavaWindow("Oracle Retail Xstore Point").JavaButton("Count Complete").Click
'Wait(4)
'JavaWindow("Oracle Retail Xstore Point").JavaEdit("PIS Confirmation").Set "919245"
'Wait(3)
'WshShell1.SendKeys"{ENTER}"
'Wait(2)
'
'If JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Exist(3) Then
'	
'	JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
'	Reporter.ReportEvent micPass,"Banking","Confirmation screen is displayed Successfully"
'	
'	Else
'		Reporter.ReportEvent micFail,"Banking","Confirmation screen is displayed UnSuccessfully"
'End If
'
'Wait(2)
'If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").Exist(3) Then
'	Wait(2)
'Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
'End If
'Wait(2)
'If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Exist(3) Then
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click	
'End If
'
'
''Open the store for next testcase
'
''login to xstore again
'
'RunAction "Action1 [Login]", oneIteration
'
'JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu_old").Select "#7"
'
'Wait(2)
'
'
'
'JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
'Wait(2)
'If JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Exist(3) Then
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click	
'
'End If
'
'Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Count Complete").Click
'Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click
'Wait(2)
'If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").Exist(3) Then
'	Wait(2)
'Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
'End If
'If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Exist(3) Then
'	
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
'End If
'On Error GoTo 0




