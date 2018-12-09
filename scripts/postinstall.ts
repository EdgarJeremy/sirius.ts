import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
const log = console.log;

const dotenv: string = `
# Database
DB_HOST=localhost
DB_DIALECT=mysql
DB_DATABASE=
DB_USER=
DB_PASS=
DB_FORCE_RENEW=false

# Request
API_URL=/api
REQUEST_LIMIT=1024mb
ALLOW_ORIGIN=*

# Token
TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
TOKEN_EXPIRATION=1m
REFRESH_TOKEN_EXPIRATION=7d
`;

log(chalk.cyan('(postinstall) : Membuat file .env'));
if (!fs.existsSync(path.resolve(__dirname, '..', '.env'))) {
    fs.writeFileSync(path.resolve(__dirname, '..', '.env'), dotenv);
}
log(chalk.cyan('(postinstall) : File .env telah dibuat\n'));
