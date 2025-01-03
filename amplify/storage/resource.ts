import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'gameAssets',
  access: (allow) => ({
    'assets/*': [
      allow.guest.to(['read']) // additional actions such as "write" and "delete" can be specified depending on your use case
    ]
  })
});