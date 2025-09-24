IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'CoderClients')
BEGIN
    CREATE DATABASE CoderClients;
END
GO

USE CoderClients;
GO

IF OBJECT_ID(N'dbo.Clients', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Clients (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Email NVARCHAR(256) NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );

    INSERT INTO dbo.Clients (Name, Email)
    VALUES
        (N'Ana Silva', N'ana.silva@example.com'),
        (N'Bruno Oliveira', N'bruno.oliveira@example.com'),
        (N'Carla Souza', N'carla.souza@example.com');
END
GO
