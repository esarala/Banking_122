'###################################################################################################################
'Test Script Name: Testcase86_CH_294_06
'Script Description: Testcase86_CH_294_06
'Designed By Date: Amrutha
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase86_CH_294_06"

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
Call LoginXstore(strLoginType,strUsername,strPassword)
wait 1

Call Testcase86_CH_294_06()

Call Logout(strLoginType)

On Error GoTo 0
ExitRun


Function Testcase86_CH_294_06()
	

Wait(2) @@ hightlight id_;_57681143_;_script infofile_;_ZIP::ssf1.xml_;_
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#6" @@ hightlight id_;_1164729464_;_script infofile_;_ZIP::ssf2.xml_;_
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Select "#6"
Wait(2)

Set WshShell1 = CreateObject("WScript.Shell")

Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("Add Tender").Click
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("Confirm").Click

If JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Exist(3) Then
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("OK").Click
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
End If
JavaWindow("Oracle Retail Xstore Point").JavaList("Declare Till / Mid-Day").Select "CASH"
Wait(3)
WshShell1.SendKeys"{ENTER}" 
Wait(2)

JavaWindow("Oracle Retail Xstore Point").JavaEdit("Enter Expected Quantity").Set "10.29"
Wait(2)
WshShell1.SendKeys"{ENTER}" 
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaButton("Count Complete").Click
Wait(2)
JavaWindow("Oracle Retail Xstore Point").JavaEdit("PIS Confirmation").Set "919345"

WshShell1.SendKeys"{ENTER}" 
Wait(2)
If JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Exist(3) Then
JavaWindow("Oracle Retail Xstore Point").JavaButton("Yes").Click	
End If
If Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Exist(3) Then
	Window("Oracle Retail Xstore Point").Dialog("Save Print Output As").WinButton("Cancel").Click
End If
'Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click
'Wait(2)
'JavaWindow("Oracle Retail Xstore Point").JavaButton("Back_2").Click

End Function
