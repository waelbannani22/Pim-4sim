import React from 'react'

import PDFViewer from 'pdf-viewer-reactjs'



const PdfViewer = (id) => {
    return (
        <PDFViewer
            document={{
                url: 'http://localhost:5000/uploads\\1649639905482.pdf',
            }}
        />
    )
}

export default PdfViewer