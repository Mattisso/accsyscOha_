import { INstbalanceinput } from '../nstbalanceinputs/nstbalanceinput';

import { InMemoryDbService } from 'angular-in-memory-web-api';

export class BalanceData implements InMemoryDbService {
  createDb() {
    const balances: INstbalanceinput[] = [
      {
        'id': '5aee112a74a15d12f4cb67a2',
        'NumCompte': '812000',
        'IntitulCompte': 'Valeurs Compt. Cessions Immo. Corp',
        'SoldeDebit': 3434178,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      },
      {
        'id': '5aee112a74a15d12f4cb6732',
        'NumCompte': '521210',
        'IntitulCompte': 'UTB C/C',
        'SoldeDebit': 38217492,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      },
      {
        'id': '5aee112a74a15d12f4cb6746',
        'NumCompte': '616200',
        'IntitulCompte': 'Transport de plis : EMS, DHL',
        'SoldeDebit': 1992381,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin',

      },
      {
        'id': '5aee112a74a15d12f4cb6749',
        'NumCompte': '618300',
        'IntitulCompte': 'Transp/Pers Expat., Admi, Expert',
        'SoldeDebit': 22462726,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      },
      {
        'id': '5aee112a74a15d12f4cb6748',
        'NumCompte': '618120',
        'IntitulCompte': 'Transp/Miss-Pers Admi',
        'SoldeDebit': 15516460,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      },
      {
        'id': '5aee112a74a15d12f4cb6747',
        'NumCompte': '618110',
        'IntitulCompte': 'Transp/Miss-Etud. Enseign',
        'SoldeDebit': 661000,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      },
      {
        'id': '5aee112a74a15d12f4cb6794',
        'NumCompte': '668500',
        'IntitulCompte': 'Titres Transp. Statutaires',
        'SoldeDebit': 1300000,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      },
      {
        'id': '5aee112a74a15d12f4cb66dd',
        'NumCompte': '220100',
        'IntitulCompte': 'Terrains',
        'SoldeDebit': 124848000,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      },
      {
        'id': '5aee112a74a15d12f4cb6719',
        'NumCompte': '445220',
        'IntitulCompte': 'T.V.A. récupérable/Electricité',
        'SoldeDebit': 6428240,
        'CreatedBy': 'Admin',
        'ModifiedBy': 'Admin'
      }
    ];
    return {balances};

  }

}

