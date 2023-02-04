import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import { beforeAll } from '@jest/globals'
import axios from 'axios'

beforeAll(() => {
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  cp.spawnSync(np, [ip], { stdio: 'inherit' })
})

it('works', async () => {
  const {data} = await axios.get('http://localhost:41230/')
  expect(data).toEqual({ok: true})
})

afterAll(async () => {
  await axios.delete('http://localhost:41230/self')
})