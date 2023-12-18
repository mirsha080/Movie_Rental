CREATE TABLE [dbo].[Movie]
(
	[movie_id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [title] VARCHAR(MAX) NOT NULL, 
    [genra] VARCHAR(100) NOT NULL,
    [cast] VARCHAR(MAX) NOT NULL,
    [date_released] DATE NOT NULL, 
    [number_of_copies] INT NOT NULL, 
    [available_copies] INT NOT NULL, 
    [rented_copies] INT NOT NULL
)   
