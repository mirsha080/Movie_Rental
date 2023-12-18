CREATE TABLE [dbo].[movie_rental]
(
	[items_id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [rental_id] INT NOT NULL, 
    [movie_id] INT NOT NULL, 
    [date_returned] DATE NULL, 
    [status] VARCHAR(50) NOT NULL, 
    CONSTRAINT [FK_rental_movie_ToTable] FOREIGN KEY (rental_id) REFERENCES [Rental](rental_id) ON DELETE CASCADE, 
    CONSTRAINT [FK_movie_rental_ToTable] FOREIGN KEY (movie_id) REFERENCES [Movie]([movie_id]) ON DELETE CASCADE,
)
