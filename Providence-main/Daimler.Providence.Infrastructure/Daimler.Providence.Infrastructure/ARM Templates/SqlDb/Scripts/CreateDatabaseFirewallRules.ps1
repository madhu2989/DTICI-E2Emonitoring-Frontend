﻿param (
    [Parameter(Mandatory=$true)]
    [String] $ResourceGroupName,

    [Parameter(Mandatory=$true)]
    [String] $SqlServerName

    [Parameter(Mandatory=$true)]
    [String] $$ipAddress
)

$firewallRules = (Get-AzSqlServerFirewallRule -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName).StartIpAddress


if($firewallRules -notcontains $ipAddress){
        Write-Host "Adding following AppService IP: $ipAddress to firewall rules."
        New-AzSqlServerFirewallRule -ResourceGroupName $ResourceGroupName -ServerName $SqlServerName -FirewallRuleName "Pipeline $ipAddress" -StartIpAddress $ipAddress -EndIpAddress $ipAddress
}


