USE master;
GO
IF DB_ID(N'ClientesDb') IS NULL
BEGIN
    CREATE DATABASE ClientesDb;
END
GO
USE ClientesDb;
GO
IF OBJECT_ID(N'dbo.Clientes', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Clientes
    (
        ClientId INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        Email NVARCHAR(200) NOT NULL,
        Phone NVARCHAR(50) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO
IF NOT EXISTS (SELECT 1 FROM dbo.Clientes)
BEGIN
    INSERT INTO dbo.Clientes (Name, Email, Phone)
    VALUES
        (N'Maria Silva', N'maria.silva@example.com', N'+55 11 98888-1111'),
        (N'João Oliveira', N'joao.oliveira@example.com', N'+55 21 97777-2222'),
        (N'Ana Souza', N'ana.souza@example.com', N'+55 31 96666-3333');
END
GO
