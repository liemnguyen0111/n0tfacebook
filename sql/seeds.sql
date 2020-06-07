
-- Login 
/api/users/:password/:username/login
{
	"username" : "#",
	"password" : '#'
}

-- Get user info
/api/users/info/:password/:uuid 

-- Add new user/register syntax
/api/users/register
{
	"username" : "SlimJim",
	"password" : "123",
	"firstName" : "Slim",
	"lastName" : "Jim",
	"age" : 25,
	"email" : "SlimJim@gmail.com",
	"gender" : "male",
	"activated": 0
}

-- Update user info
/api/users/update/:password/:uuid
{
	"username" : "#",
	"password" : "#",
	"firstName" : "#",
	"lastName" : "#",
	"age" : #,
	"email" : "#@#.#",
	"gender" : "male",
	"activated": #
}

-- Delete account
/api/users/delete/:password/:uuid

-- Unfriend syntax - requires 2 params userUuid and friendUuid
{
	"userUuid" : "provide user 1 uuid",
	"friendUuid" : "provide user 2 uuid"
} 