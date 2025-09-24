IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'ClientCatalog')
BEGIN
    CREATE DATABASE ClientCatalog;
END;
GO

USE ClientCatalog;
GO

IF OBJECT_ID(N'dbo.Clients', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Clients (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(120) NOT NULL,
        Email NVARCHAR(255) NOT NULL,
        Document NVARCHAR(32) NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );

    INSERT INTO dbo.Clients (Name, Email, Document)
    VALUES
        ('Alice Johnson', 'alice.johnson@example.com', '12345678901'),
        ('Bruno Silva', 'bruno.silva@example.com', '98765432100'),
        ('Carla Souza', 'carla.souza@example.com', '19283746509');
END;
GO
