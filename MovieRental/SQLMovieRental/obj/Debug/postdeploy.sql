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
