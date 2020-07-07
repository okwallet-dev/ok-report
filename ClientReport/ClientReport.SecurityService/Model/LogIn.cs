using System;
using System.Collections.Generic;
using System.Text;

namespace ClientReport.SecurityService.Model
{
	public class LogIn
	{
		public string UserName { get; set; }
		public string Password { get; set; }
		public int FailedAttempts { get; set; }
	}
}
