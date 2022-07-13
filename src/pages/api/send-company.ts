import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const endpoint = async (request: NextApiRequest, response: NextApiResponse) => {
  const googleSpreadsheet = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)

  await googleSpreadsheet.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SHEET_EMAIL,
    private_key: process.env.GOOGLE_SHEET_KEY.replace(/\\n/g, '\n')
  })

  await googleSpreadsheet.loadInfo()
  const sheet = googleSpreadsheet.sheetsByIndex[0]

  const data = request.body

  await sheet.addRow({
    data: new Date().toLocaleDateString(),
    empresa: data.company,
    email: data.email,
    telefone: data.phone,
    n_funcionarios: data.employees
  })

  response.status(200).json({ ok: true })
}
export default endpoint
