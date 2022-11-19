-- CreateTable
CREATE TABLE "Editora" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "editoraId" BIGINT NOT NULL,
    CONSTRAINT "Livro_editoraId_fkey" FOREIGN KEY ("editoraId") REFERENCES "Editora" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
