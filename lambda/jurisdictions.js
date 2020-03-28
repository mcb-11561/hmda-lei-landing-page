import qs from 'querystring'
import fetch from 'node-fetch'
const RAPID_LEI_TOKEN = process.env.RAPID_LEI_TOKEN
const RAPID_LEI_HOST = process.env.RAPID_LEI_HOST
const RAPID_LEI_ID = process.env.RAPID_LEI_ID

import countryLookup from 'country-code-lookup'
import stateCodes from 'us-state-codes'

const getRapidLeiHeaders = async () => {
  const authResult = await fetch(`${RAPID_LEI_HOST}/auth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: qs.stringify({
      grant_type: 'client_credentials',
      client_id: RAPID_LEI_ID,
      client_secret: RAPID_LEI_TOKEN
    })
  }).then((r) => r.json())

  const token = authResult.access_token

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  return headers
}

export async function handler(event, context) {
  const headers = await getRapidLeiHeaders()
  const result = await fetch(`${RAPID_LEI_HOST}/jurisdictions`, {
    headers
  }).then((r) => r.json())

  const options = [
    {
      label: 'Countries',
      options: result.countries
        .filter((x) => x.confidenceLevel > 8)
        .map((x) => ({
          value: x.jurisdiction,
          label: countryLookup.byIso(x.jurisdiction).country
        }))
    }
  ]

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  }
}
