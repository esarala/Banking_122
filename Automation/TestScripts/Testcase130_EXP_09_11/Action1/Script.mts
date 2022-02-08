'###################################################################################################################
'Test Script Name: Testcase130_EXP_09_11
'Script Description: Testcase130_EXP_09_11
'Designed By Date: Amrutha
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase130_EXP_09_11"

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
'		intAmount = DataTable.Value("Amount")
'		strJustification = DataTable.Value("Justification")
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
Repositoriescollection.Add DirPath&"\ObjectRepository\Repository1.tsr"

LoadFunctionLibrary DirPath&"\FunctionLibrary\CommonFunctions.qfl"
LoadFunctionLibrary DirPath&"\FunctionLibrary\Banking.qfl"

wait (2)
Call LoginXstore(strLoginType,strUsername,strPassword)
wait 1

Call Testcase130_EXP_09_11(intBagReference)

Call Logout(strLoginType)

On Error GoTo 0
ExitRun


Function Testcase130_EXP_09_11(intBagReference)
	
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#6"
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#1"
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("New").Click
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaEdit("Enter Collection Bag Reference").Set intBagreference
Wait(2)
Set WshShell1 = CreateObject("WScript.Shell")

WshShell1.SendKeys"{F2}"
Wait(2)
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Exist(3) Then
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
	Reporter.ReportEvent micPass,"Back Button validated successfully","Back button validated successfully"
Else
	Reporter.ReportEvent micFail,"Back Button validated Unsuccessfully","Back Button validated Unsuccessfully"
End  If

If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Exist(3) Then
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
End  If
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Cancel").Exist(3) Then
	JavaWindow("Oracle Retail Xstore Point").JavaButton("Cancel").Click
End If
'If JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Exist(3) Then
'	JavaWindow("Oracle Retail Xstore Point").JavaButton("Back").Click
'End If

End Function
