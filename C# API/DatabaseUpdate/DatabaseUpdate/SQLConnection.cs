 
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DatabaseUpdate
{

	class SQLConnection
	{
		//Sqlconnection 
		private SqlConnection conn;

		//establish SQL connection
		public void Connect()
		{
			//connection String
			string connectionString = @"Server=localhost;Database=master;Trusted_Connection=True;";

			//Establish Connection
			conn = new SqlConnection(connectionString);
			conn.Open();
		}
		public static void BulkCopy(string link, string digital, string extract, string table)
		{

			string connectionString = @"Server=localhost;Database=master;Trusted_Connection=True;";

			var datatable = new DataTable();
			datatable.Columns.Add("INVOICELINK");
			datatable.Columns.Add("INVOICEDIGITAL");
			datatable.Columns.Add("INVOICEEXTACT");
			datatable.Columns.Add("INVOICETABLE");
			datatable.Rows.Add(link, digital, extract, table);
			using (var bcp = new SqlBulkCopy(connectionString))
			{
				bcp.ColumnMappings.Add("INVOICELINK", "INVOICELINK");
				bcp.ColumnMappings.Add("INVOICEDIGITAL", "INVOICEDIGITAL");
				bcp.ColumnMappings.Add("INVOICEEXTACT", "INVOICEEXTACT");
				bcp.ColumnMappings.Add("INVOICETABLE", "INVOICETABLE");

				bcp.BatchSize = 1;
				bcp.BulkCopyTimeout = 0;
				bcp.DestinationTableName = "Store";
				bcp.WriteToServer(datatable);
			}
		}

		public List<List<string>> CustomRead(string query)
		{
			//Sql Command
			SqlCommand cmd;

			//SQL data reader
			SqlDataReader dreader;


			// Execute the sql statement 
			cmd = new SqlCommand(query, conn);
			dreader = cmd.ExecuteReader();

			//output List
			List<List<string>> output = new List<List<string>>();

			//add column name
			List<string> col = new List<string>();

			for (int i = 0; i < dreader.FieldCount; i++)
				col.Add(dreader.GetName(i));

			output.Add(col);

			// for one by one reading row 
			while (dreader.Read())
			{
				List<string> row = new List<string>();
				for (int i = 0; i < dreader.FieldCount; i++)
					row.Add(dreader.GetValue(i).ToString());
				output.Add(row);
			}

			// to close all the objects 
			dreader.Close();
			cmd.Dispose();
			return output;
		}
		public List<List<string>> Read(string table)
		{
			//Sql Command
			SqlCommand cmd;

			//SQL data reader
			SqlDataReader dreader;

			//SQL Command
			string sql;

			sql = "Select * from " + table;

			// Execute the sql statement 
			cmd = new SqlCommand(sql, conn);
			dreader = cmd.ExecuteReader();

			//output List
			List<List<string>> output = new List<List<string>>();

			//add column name
			List<string> col = new List<string>();

			for (int i = 0; i < dreader.FieldCount; i++)
				col.Add(dreader.GetName(i));

			output.Add(col);

			// for one by one reading row 
			while (dreader.Read())
			{
				List<string> row = new List<string>();
				for (int i = 0; i < dreader.FieldCount; i++)
					row.Add(dreader.GetValue(i).ToString());
				output.Add(row);
			}

			// to close all the objects 
			dreader.Close();
			cmd.Dispose();
			return output;
		}
		public void Delete(string table, KeyValuePair<string, string> value)
		{
			//SQl Command
			SqlCommand cmd;

			// SQL Data Adapter
			SqlDataAdapter adap = new SqlDataAdapter();

			string sql = "delete from " + table + " where " + value.Key + "=" + value.Value;

			// execute SQL command 
			cmd = new SqlCommand(sql, conn);
			adap.InsertCommand = new SqlCommand(sql, conn);
			adap.InsertCommand.ExecuteNonQuery();

			// closing all the objects 
			cmd.Dispose();
		}


		public void Insert(string table, List<KeyValuePair<string, string>> values)
		{
			//SQl Command
			SqlCommand cmd;

			// SQL Data Adapter
			SqlDataAdapter adap = new SqlDataAdapter();

			string sql = "INSERT INTO " + table, colname = "", colvalue = "";

			foreach (var val in values)
			{
				colname += val.Key + ",";
				colvalue += "'" + val.Value + "',";
			}
			System.Diagnostics.Trace.TraceInformation(colname + "\n" + colvalue);
			colname = colname.Substring(0, colname.Length - 1);
			colvalue = colvalue.Substring(0, colvalue.Length - 1);

			sql += " ( " + colname + " ) VALUES ( " + colvalue + " );";

			// execute SQL command 
			cmd = new SqlCommand(sql, conn);
			adap.InsertCommand = new SqlCommand(sql, conn);
			adap.InsertCommand.ExecuteNonQuery();
			// closing all the objects 
			cmd.Dispose();
		}

		public void CustomInsert(string sql)
		{
			//SQl Command
			SqlCommand cmd;

			// SQL Data Adapter
			SqlDataAdapter adap = new SqlDataAdapter();

			// execute SQL command 
			cmd = new SqlCommand(sql, conn);
			adap.InsertCommand = new SqlCommand(sql, conn);
			adap.InsertCommand.ExecuteNonQuery();
			// closing all the objects 
			cmd.Dispose();
		}

		public void Update(string table, List<KeyValuePair<string, string>> values)
		{
			//SQl Command
			SqlCommand cmd;

			// SQL Data Adapter
			SqlDataAdapter adap = new SqlDataAdapter();

			string sql = "update " + table + " set ", clause = "", filterval = " where " + values[0].Key + "=\'" + values[0].Value + "\'";
			values.RemoveAt(0);
			foreach (var val in values)
			{
				clause += val.Key + "=\'" + val.Value + "\',";
			}
			clause = clause.Substring(0, clause.Length - 1);

			sql += clause + filterval;

			// execute SQL command 
			cmd = new SqlCommand(sql, conn);
			adap.InsertCommand = new SqlCommand(sql, conn);
			adap.InsertCommand.ExecuteNonQuery();

			// closing all the objects 
			cmd.Dispose();
		}

		//end connection 
		public void endConnect()
		{
			conn.Close();
		}
	}
}