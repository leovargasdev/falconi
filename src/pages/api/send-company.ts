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

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const year = currentDate.getFullYear()

  await sheet.addRow({
    data: day + '/' + month + '/' + year,
    empresa: data.company,
    email: data.email,
    telefone: data.phone,
    n_funcionarios: data.employees
  })

  response.status(200).json({ ok: true })
}
export default endpoint
