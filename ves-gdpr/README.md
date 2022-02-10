# Ves_Gdpr Module

**Ves_Gdpr** is a module for handling GDPR information deletion requests. This is a school project and therefore
should not be used in any kind of real life production application.

## Setup

### Step 1. Create a directory for the module like above format.

In this module, we will use `Ves` for Vendor name and `Gdpr` for ModuleName. So we need to make this folder:
`app/code/Ves/Gdpr`

### Step 2. Clone this repository.

Clone contents of this repository inside `Ves_Gdpr` module.

### Step 3. Enabling module and migrations

Following commands should be ran as correct user privileges.

Run following command to enable this module:
```
php bin/magento module:enable Ves_Gdpr
```

Run following command to run migrations to database:
```
php bin/magento setup:upgrade
```

Run following command to run dependency injection and code generations:
```
php bin/magento setup:di:compile
```

If given an error, running cache:flush might help:
```
php bin/magento cache:flush
```