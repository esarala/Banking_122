﻿'###################################################################################################################
'Test Script Name: Testcase108_EXP_09_57
'Script Description: Testcase108_EXP_09_57
'Designed By Date: Amrutha
'Designed Date(MM/DD/YY): 10/11/2020
'Modified By&date: When do some change need to update here
'###################################################################################################################
On Error Resume Next
    
DataFilePath = "C:\Banking\Automation\TestData\Banking.xls"
TestScriptName = "Testcase108_EXP_09_57"

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
		intPLU = DataTable.Value("PLU")
		intVoucher = DataTable.Value("Voucher")
		intVoucherAmt = DataTable.Value("VoucherAmt")
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

'If JavaWindow("Oracle Retail Xstore Point").JavaList("Main Menu").Exist(2) then
'	Reporter.ReportEvent micDone,"Login into Xstore","User has Already logged into Xstore"
'Else
Call LoginXstore(strLoginType,strUsername,strPassword)
'	wait 1
'End If
Call NonIMEISaleCapitalIncentive(intPLU, intVoucher, intVoucherAmt)

Call LoginXstore("Backoffice",strUsername,strPassword)

Call Testcase108_EXP_09_57()

Call Logout(strLoginType)

On Error GoTo 0
ExitRun




'RunAction "Action1 [NonIMEIsalecapitalIncentive]", oneIteration
'Wait(3)
'
'
'RunAction "Action1 [Testcase99_EXP_09_79]", oneIteration
