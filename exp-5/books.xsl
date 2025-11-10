<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes" />

    <xsl:template match="/">
        <html>
            <head>
                <title>Book Information</title>
                <link rel="stylesheet" type="text/css" href="style.css" />
            </head>
            <body>
                <h2>Book Information</h2>
                <table cellspacing="0" cellpadding="8">
                    <tr class="header">
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Publisher</th>
                        <th>Edition</th>
                        <th>Price</th>
                    </tr>
                    <xsl:for-each select="bookstore/book">
                        <tr>
                            <td class="title">
                                <xsl:value-of select="title" />
                            </td>
                            <td class="author">
                                <xsl:value-of select="author" />
                            </td>
                            <td class="isbn">
                                <xsl:value-of select="isbn" />
                            </td>
                            <td class="publisher">
                                <xsl:value-of select="publisher" />
                            </td>
                            <td class="edition">
                                <xsl:value-of select="edition" />
                            </td>
                            <td class="price">
                                <xsl:value-of select="price" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>