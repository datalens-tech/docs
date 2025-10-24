---
title: How to manage users in {{ datalens-full-name }}
description: Follow this guide to manage users in {{ datalens-short-name }}.
---

# User management in {{ datalens-short-name }}

In {{ datalens-name }}, user management is performed by the administrator, i.e., user with the `Admin` (`{{ roles-datalens-admin }}`) [role](./roles.md#datalens-admin). For other users to be able to log in to {{ datalens-name }}, the administrator has to create [accounts](#add-user) for them.

## User accounts {#account}

A user account consists of:

* User profile: First name, last name, login, email, ID.
* Password.
* [Role](./roles.md#service-roles).

The administrator can view the list of all users and their accounts. To do this:

1. Open {{ datalens-full-name }} settings. In the navigation panel on the left, click ![image](../../_assets/console-icons/sliders.svg) **Service settings**.
1. Go to the **Users** tab to see the list of all users.
1. To view a user account, click the line with the login.

## Creating a user account {#add-user}

There are two ways to create a user account in {{ datalens-short-name }}:

* The user signs up to {{ datalens-short-name }} by following [this guide](user-account.md#sign-up). In which case, the user gets the minimum [role](./roles.md#datalens-viewer), `Viewer` (`{{ roles-datalens-tech-viewer }}`). The administrator [edits the new account](#edit-user).
* The administrator creates an account for the user and provides the login and temporary password. The users changes the password on first sign-in according to [this guide](./user-account.md#edit-password).

To create a user account:

1. Open {{ datalens-full-name }} settings. In the navigation panel on the left, click ![image](../../_assets/console-icons/sliders.svg) **Service settings**.
1. Go to the **Users** tab and click ![image](../../_assets/console-icons/plus.svg) **Add user**.
1. Complete the user profile:

   * **Login**. Enter the user’s login used to sign in and identify the account. Choose the login as per these requirements:

     * From 3 to 200 characters long.
     * Starts with an uppercase or lowercase Latin letter.
     * May contain uppercase or lowercase Latin letters, numbers, `_` or `-`.
     * Ends with an uppercase or lowercase Latin letter or a number.
     * You can also use an email address as the login.

   * Optionally, specify the user’s **First name**.
   * Optionally, specify the user’s **Last name**.
   * Optionally, specify the user’s **Email**.
   * **Role**. Select a [role](./roles.md#service-roles) for the user. You can change the role when editing the user profile.
   * **Password**. Enter a password the user will sign in with. Choose the password as per these requirements:

     * From 8 to 200 characters long.
     * Contains at least one uppercase Latin letter and one lowercase Latin letter.
     * Contains at least one number.
     * Contains at least one of these characters: `!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `-`, or `_`.
     * May contain any other characters.

1. Click **Add**.

Communicate the login and password to the user with an instruction to change the password on first sign-in as per [this guide](./user-account.md#edit-password).

## Editing a user account {#edit-user}

The administrator can [edit](#admin-edit-user) any user account, including their own one. Accounting editing includes:

* [Editing the profile](#edit-profile)
* [Changing the password](#change-password)
* [Assigning a role](#assign-role)
* [Deleting the account from the system](#delete-user)

### Editing a user profile {#edit-profile}

To change the user profile information:

1. Open {{ datalens-full-name }} settings. In the navigation panel on the left, click ![image](../../_assets/console-icons/sliders.svg) **Service settings**.
1. Go to the **Users** tab.
1. To the right of the user's name, click ![image](../../_assets/console-icons/ellipsis.svg) → **Edit profile**.
1. Edit the user’s first name, last name, or email address. Click **Save**.

### Changing the password {#change-password}

If the user has forgotten their password, you can reset it and set a temporary one for the user to be able to log in. To change the user's password:

1. Open {{ datalens-full-name }} settings. In the navigation panel on the left, click ![image](../../_assets/console-icons/sliders.svg) **Service settings**.
1. Go to the **Users** tab.
1. To the right of the user's name, click ![image](../../_assets/console-icons/ellipsis.svg) → **Change password**.
1. Enter or generate a temporary password and click **Save**. Communicate this password to the user and tell them to change it on first sign-in as per [this guide](./user-account.md#edit-password).

### Assigning a role {#assign-role}

To change the [user’s role in the service](./roles.md#service-roles):

1. Open {{ datalens-full-name }} settings. In the navigation panel on the left, click ![image](../../_assets/console-icons/sliders.svg) **Service settings**.
1. Go to the **Users** tab.
1. To the right of the user's name, click ![image](../../_assets/console-icons/ellipsis.svg) → **Assign a role**.
1. Select a role from the drop-down list and click **Save**.


### Deleting a user {#delete-user}

{% note warning %}

The administrator cannot delete their own account.

{% endnote %}

To delete a user:

1. Open {{ datalens-full-name }} settings. In the navigation panel on the left, click ![image](../../_assets/console-icons/sliders.svg) **Service settings**.
1. Go to the **Users** tab.
1. To the right of the user's name, click ![image](../../_assets/console-icons/ellipsis.svg) → **Delete user**.
1. To confirm deletion, click **Delete user**.
