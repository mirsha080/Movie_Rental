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
PRINT N'Altering Table [dbo].[movie_rental]...';


GO
ALTER TABLE [dbo].[movie_rental] ALTER COLUMN [date_returned] DATETIME NULL;


GO
PRINT N'Altering Table [dbo].[Rental]...';


GO
ALTER TABLE [dbo].[Rental] ALTER COLUMN [rent_date] DATETIME NOT NULL;


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
    INSERT INTO dbo.Movie (title, genra, cast, date_released,number_of_copies,available_copies,rented_copies)
    VALUES ('Jack The Giant Slayer', 'Adventure, Action, Fantasy','Ewan McGregor, Nicholas Hoult, Stanley Tucci', '2013-03-01',10,10,0);
END
GO

GO
PRINT N'Update complete.';


GO
