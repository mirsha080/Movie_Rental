﻿/*
Deployment script for MovieRentalDb

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "MovieRentalDb"
:setvar DefaultFilePrefix "MovieRentalDb"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
/*
The column [dbo].[Movie].[description] is being dropped, data loss could occur.

The column [dbo].[Movie].[available_copies] on table [dbo].[Movie] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.

The column [dbo].[Movie].[rented_copies] on table [dbo].[Movie] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.

The column cast on table [dbo].[Movie] must be changed from NULL to NOT NULL. If the table contains data, the ALTER script may not work. To avoid this issue, you must add values to this column for all rows or mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.

The column date_released on table [dbo].[Movie] must be changed from NULL to NOT NULL. If the table contains data, the ALTER script may not work. To avoid this issue, you must add values to this column for all rows or mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.

The column genra on table [dbo].[Movie] must be changed from NULL to NOT NULL. If the table contains data, the ALTER script may not work. To avoid this issue, you must add values to this column for all rows or mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.
*/

IF EXISTS (select top 1 1 from [dbo].[Movie])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
/*
The column [dbo].[movie_rental].[rented_on] is being dropped, data loss could occur.

The column [dbo].[movie_rental].[status] on table [dbo].[movie_rental] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.
*/

IF EXISTS (select top 1 1 from [dbo].[movie_rental])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
PRINT N'The following operation was generated from a refactoring log file e536eb1d-7f71-4a33-a415-01e40771b4ad';

PRINT N'Rename [dbo].[movie_rental].[return_date] to rented_on';


GO
EXECUTE sp_rename @objname = N'[dbo].[movie_rental].[return_date]', @newname = N'rented_on', @objtype = N'COLUMN';


GO
PRINT N'Rename refactoring operation with key dc542610-dc71-4bff-a1af-320533d1cd40, a06bdb12-2e6a-4e27-8ceb-e7d887010911, 1d4d69f6-4d79-421a-a78e-a5fd692fa394 is skipped, element [dbo].[movie_rental].[status] (SqlSimpleColumn) will not be renamed to date_returned';


GO
PRINT N'Altering Table [dbo].[Movie]...';


GO
ALTER TABLE [dbo].[Movie] DROP COLUMN [description];


GO
ALTER TABLE [dbo].[Movie] ALTER COLUMN [cast] VARCHAR (MAX) NOT NULL;

ALTER TABLE [dbo].[Movie] ALTER COLUMN [date_released] DATE NOT NULL;

ALTER TABLE [dbo].[Movie] ALTER COLUMN [genra] VARCHAR (100) NOT NULL;


GO
ALTER TABLE [dbo].[Movie]
    ADD [available_copies] INT NOT NULL,
        [rented_copies]    INT NOT NULL;


GO
PRINT N'Altering Table [dbo].[movie_rental]...';


GO
ALTER TABLE [dbo].[movie_rental] DROP COLUMN [rented_on];


GO
ALTER TABLE [dbo].[movie_rental]
    ADD [date_returned] DATE         NULL,
        [status]        VARCHAR (50) NOT NULL;


GO
-- Refactoring step to update target server with deployed transaction logs
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '32a80eab-8181-4670-b0d5-f3229bba6b74')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('32a80eab-8181-4670-b0d5-f3229bba6b74')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'e536eb1d-7f71-4a33-a415-01e40771b4ad')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('e536eb1d-7f71-4a33-a415-01e40771b4ad')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'dc542610-dc71-4bff-a1af-320533d1cd40')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('dc542610-dc71-4bff-a1af-320533d1cd40')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = 'a06bdb12-2e6a-4e27-8ceb-e7d887010911')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('a06bdb12-2e6a-4e27-8ceb-e7d887010911')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '1d4d69f6-4d79-421a-a78e-a5fd692fa394')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('1d4d69f6-4d79-421a-a78e-a5fd692fa394')
IF NOT EXISTS (SELECT OperationKey FROM [dbo].[__RefactorLog] WHERE OperationKey = '77b53e97-d25c-4c56-8116-c82202105651')
INSERT INTO [dbo].[__RefactorLog] (OperationKey) values ('77b53e97-d25c-4c56-8116-c82202105651')

GO

GO
/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
IF NOT EXISTS (SELECT * FROM dbo.Movie WHERE title = 'Jack The Giant Slayer')
BEGIN
    INSERT INTO dbo.Movie (Title, Genra, description, cast, date_released,number_of_copies,available_copies,rented_copies)
    VALUES ('Jack The Giant Slayer', 'Adventure, Action, Fantasy','n the Kingdom of Cloister, Jack, a young farm boy, is fascinated by the legend of Erik, an ancient king who defeated an army of invading giants from a realm in the sky by controlling them with a magical crown. At the same time, Princess Isabelle becomes fascinated with the same legend.Ten years later, Jack goes into town to sell his horse to support his uncles farm','Ewan McGregor, Nicholas Hoult, Stanley Tucci', '2013-03-01',10,10,0);
END
GO

GO
PRINT N'Update complete.';


GO
