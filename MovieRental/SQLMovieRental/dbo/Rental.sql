CREATE TABLE [dbo].[Rental]
(
	[rental_id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [customer_id] INT NOT NULL, 
    [rent_date] DATETIME NOT NULL, 
    CONSTRAINT [FK_Rental_ToTable] FOREIGN KEY ([customer_id]) REFERENCES [Customer]([customer_id]) ON DELETE CASCADE
)
