CREATE TABLE [dbo].[Customer]
(
	[customer_id] INT NOT NULL PRIMARY KEY IDENTITY,
	[first_name] VARCHAR(100) NOT NULL,
	[last_name] VARCHAR(100) NOT NULL,
	[birth_date] DATE NOT NULL, 
    [contact_num] VARCHAR(50) NOT NULL, 
    [address] VARCHAR(150) NOT NULL,
	

)
