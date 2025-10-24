---
title: How to sign up in {{ datalens-full-name }}
description: Follow this guide to sign up and get authenticated in {{ datalens-full-name }}.
---

# Using a {{ datalens-short-name }} user account

* [How to get authenticated in {{ datalens-name }}](#auth)
* [How to sign up to {{ datalens-name }}](#sign-up)
* [User account](#see-account)
* [How to change the account password](#edit-password)

## Authentication in {{ datalens-short-name }} {#auth}

You need to get authenticated in {{ datalens-short-name }} to access it:

1. Go to the {{ datalens-short-name }} page.
1. Enter your login and password.

   {% note info %}

   Use the login you selected at sign-up or got from the administrator.
   
   {% endnote %}

   If you forgot the password, contact the administrator.

1. Click **Log in**.

If you do not have a {{ datalens-short-name }} account, contact the administrator.

## Signing up to {{ datalens-short-name }} {#sign-up}

{% note warning %}

Use this guide only if the {{ datalens-short-name }} administrator has told you to sign up by yourself.

{% endnote %}

1. Open the home page of the service.
1. Click **Sign up** at the bottom of the authentication window.
1. Fill in the user profile:

   * **Login**. Make up a login to enable sign-in and to identify your account. When choosing the login, keep in mind these rules:

     * From 3 to 200 characters long.
     * Starts with an uppercase or lowercase Latin letter.
     * Other characters are uppercase or lowercase Latin letters, numbers, `_`, or `-`.
     * Ends with an uppercase or lowercase Latin letter or a number.
     * Using email address instead of the login is also possible.
   
   * (Optional) **Email**. Specify your email address.
   * (Optional) **First name**. Specify your first name.
   * (Optional) **Last name**. Specify your last name.
   * **Password**. Make up a password you will use to sign in. Choose the password according to these rules:

     * From 8 to 200 characters long.
     * Contains at least one uppercase Latin letter and one lowercase Latin letter.
     * Contains at least one number.
     * Contains at least one of these characters: `!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `-`, or `_`.
     * May contain any other characters.

   * **Confirm the password**. Re-enter your password.

1. Click **Sign up**.

Once you have signed up, an account with the specified profile data and the `Viewer` (`{{ roles-datalens-tech-viewer }}`) [role](./roles.md#datalens-viewer) will be created.

### Viewing a user account {#see-account}

Each user can view their account parameters:

* User profile: First name, last name, login, email, ID.
* [Role](./roles.md#service-roles) in the service.

The user password is stored privately. You cannot view it, but you can [change](#edit-password) it.

To view your account, click **Account** → ![image](../../_assets/console-icons/gear.svg) in the left-hand navigation panel.

Users with the `Admin` (`{{ roles-datalens-tech-admin }}`) [role](./roles.md#datalens-admin) in {{ datalens-name }} can edit any user account. Other users can only [change their own password](#edit-password). Learn more about [editing user accounts by the administrator](./manage-users.md#edit-user).

### Changing the password {#edit-password}

To change your account password:

1. In the left-hand navigation panel, click **Account** → ![image](../../_assets/console-icons/gear.svg).
1. Click **Change password**. Enter the current password and create a new one in line with the system requirements.
1. Re-enter the new password.
1. Click **Save**.

To change the user’s role and other data, contact the administrator.
