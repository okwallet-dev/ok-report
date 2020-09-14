using Dapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace OneMFS.SharedResources
{
    public interface IBaseRepository<T> 
    {
        T Add(T entity);
        T Update(T entity);
        T UpdateByStringField(T entity, string stringField);
        T UpdateRegInfo(T entity);
        IEnumerable<T> GetAll(T entity);
        T SingleOrDefault(int Id, T entity, string identifier = "Id");
        bool Delete(T entity);
        object GetDropdownList(string label, string value, T entity);
        T SingleOrDefaultByCustomField(string Id, string customField, T entity);
        T DeleteByCustomField(string id, string customField, T entity);
        IEnumerable<T> GetAllByCustomField(string Id, string customField, T entity);
    }

    public class BaseRepository<T> : ConnectionManager
    {
        public T Add(T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();
                string propertyNames = "";
                string propertyNamesDump = "";
                string propertyValues = "";
                string propertyValuesDump = "";
                string query = "INSERT INTO " + convert.ToPascalCase(entity.GetType().Name);

                foreach (var prop in entity.GetType().GetProperties())
                {                   
                    if(prop.Name.ToLower() != "id" && !prop.Name.Contains("_"))
                    {
                        if (prop.GetValue(entity, null) != null)
                        {
                            propertyNamesDump = convert.ToPascalCase(prop.Name) + ",";
                            propertyNames = propertyNames + propertyNamesDump;

                            switch (prop.PropertyType.Name)
                            {
                                case "Int32":
                                    propertyValuesDump = prop.GetValue(entity, null) + ",";
                                    break;
                                case "Boolean":
                                    propertyValuesDump = prop.GetValue(entity, null) + ",";
                                    break;
                                case "Binary":
                                    propertyValuesDump = prop.GetValue(entity, null) + ",";
                                    break;
                                case "DateTime":
                                    propertyValuesDump = "TO_DATE('" + Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')" + ",";
                                    break;
                                default:
                                    if (prop.PropertyType.IsGenericType &&
                                    prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                                    {
                                        switch (prop.PropertyType.GetGenericArguments()[0].Name)
                                        {
                                            case "Int32":
                                                propertyValuesDump = prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Boolean":
                                                propertyValuesDump = prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Binary":
                                                propertyValuesDump = prop.GetValue(entity, null) + ",";
                                                break;
                                            case "DateTime":
                                                propertyValuesDump = "TO_DATE('"+ Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')"  + ",";
                                                break;
                                            default:
                                                propertyValuesDump = "'" + convert.EscapeInvalidCharacter(prop.GetValue(entity, null)) + "'" + ",";
                                                break;
                                        }
                                    }
                                    else
                                    {
                                        propertyValuesDump = "'" + convert.EscapeInvalidCharacter(prop.GetValue(entity, null)) + "'" + ",";
                                    }
                                    break;
                            }
                            propertyValues = propertyValues + propertyValuesDump;
                        }
                    }
                    
                }

                query = query + " (" + propertyNames.TrimEnd(',') + ")" + " VALUES " + "( " + propertyValues.TrimEnd(',') + " )";

                var result = ExecuteScaler(query);
                return entity;
            }
            catch (Exception e)
            {
                throw;
            }
            
        }

        public T Update(T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();
                string whereClause = "";
                string query = "UPDATE " + convert.ToPascalCase(entity.GetType().Name) + " SET ";

                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (prop.GetValue(entity, null) != null && !prop.Name.Contains("_"))
                    {
                        if (prop.Name == "Id")
                        {
                            whereClause = " WHERE Id=" + prop.GetValue(entity, null);
                        }
                        else
                        {
                            switch (prop.PropertyType.Name)
                            {
                                case "Int32":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "Boolean":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "Binary":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "DateTime":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = "+ "TO_DATE('" + Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')" + ",";
                                    break;
                                default:
                                    if (prop.PropertyType.IsGenericType &&
                                    prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                                    {
                                        switch (prop.PropertyType.GetGenericArguments()[0].Name)
                                        {
                                            case "Int32":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Boolean":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Binary":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "DateTime":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + "TO_DATE('" + Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')" + ",";
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    else
                                    {
                                        query = query + " " + convert.ToPascalCase(prop.Name) + " = '" + convert.EscapeInvalidCharacter(prop.GetValue(entity, null)) + "',";
                                    }
                                    break;
                            }
                        }
                    }
                }

                query = query.TrimEnd(',') + whereClause;

                var result = ExecuteScaler(query);
                return entity;
            }
            catch (Exception e)
            {
                throw;
            }
            
        }

        public T UpdateByStringField(T entity, string stringField)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();
                string whereClause = "";
                string query = "UPDATE " + convert.ToPascalCase(entity.GetType().Name) + " SET ";

                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (prop.GetValue(entity, null) != null && !prop.Name.Contains("_"))
                    {
                        if (prop.Name.ToLower() == stringField.ToLower())
                        {
                            whereClause = prop.PropertyType.Name == "Int32"? " WHERE "+ convert.ToPascalCase(stringField) +"= " + ""+prop.GetValue(entity, null)+"": " WHERE " + convert.ToPascalCase(stringField) + "= " + "'" + prop.GetValue(entity, null) + "'";
                        }
                        else
                        {
                            switch (prop.PropertyType.Name)
                            {
                                case "Int32":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "Boolean":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "Binary":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "DateTime":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + "TO_DATE('" + Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')" + ",";
                                    break;
                                default:
                                    if (prop.PropertyType.IsGenericType &&
                                    prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                                    {
                                        switch (prop.PropertyType.GetGenericArguments()[0].Name)
                                        {
                                            case "Int32":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Boolean":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Binary":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "DateTime":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + "TO_DATE('" + Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')" + ",";
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    else
                                    {
                                        query = query + " " + convert.ToPascalCase(prop.Name) + " = '" + convert.EscapeInvalidCharacter(prop.GetValue(entity, null)) + "',";
                                    }
                                    break;
                            }
                        }
                    }
                }

                query = query.TrimEnd(',') + whereClause;

                var result = ExecuteScaler(query);
                return entity;
            }
            catch (Exception e)
            {
                throw;
            }

        }

        public T UpdateRegInfo(T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();
                string whereClause = "";
                string query = "UPDATE " + convert.ToPascalCase(entity.GetType().Name) + " SET ";

                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (prop.GetValue(entity, null) != null && !prop.Name.Contains("_"))
                    {
                        if (prop.Name.ToLower() == "mphone")
                        {
                            whereClause = " WHERE mphone=" + "'"+prop.GetValue(entity, null)+"'";
                        }
                        else
                        {
                            switch (prop.PropertyType.Name)
                            {
                                case "Int32":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "Boolean":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "Binary":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                    break;
                                case "DateTime":
                                    query = query + " " + convert.ToPascalCase(prop.Name) + " = " + "TO_DATE('" + Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')" + ",";
                                    break;
                                default:
                                    if (prop.PropertyType.IsGenericType &&
                                    prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                                    {
                                        switch (prop.PropertyType.GetGenericArguments()[0].Name)
                                        {
                                            case "Int32":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Boolean":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "Binary":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + prop.GetValue(entity, null) + ",";
                                                break;
                                            case "DateTime":
                                                query = query + " " + convert.ToPascalCase(prop.Name) + " = " + "TO_DATE('" + Convert.ToDateTime(prop.GetValue(entity, null)).ToString("yyyy/MM/dd HH:mm:ss") + "', 'yyyy/mm/dd hh24:mi:ss')" + ",";
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    else
                                    {
                                        query = query + " " + convert.ToPascalCase(prop.Name) + " = '" + convert.EscapeInvalidCharacter(prop.GetValue(entity, null)) + "',";
                                    }
                                    break;
                            }
                        }
                    }
                }

                query = query.TrimEnd(',') + whereClause;

                var result = ExecuteScaler(query);
                return entity;
            }
            catch (Exception e)
            {
                throw;
            }

        }

        public IEnumerable<T> GetAll(T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();

                string selectedColumns = "";

                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (!prop.Name.Contains("_"))
                    {
                        selectedColumns = selectedColumns + convert.ToPascalCase(prop.Name) + " AS " + prop.Name + ",";
                    }
                }

                string query = "Select "+ selectedColumns.TrimEnd(',') + " from " + convert.ToPascalCase(entity.GetType().Name);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                var list = conn.Query<T>(query);

                this.CloseConnection(conn);

                return list;

            }
            catch (Exception e)
            {
                throw;
            }
        }

        public T SingleOrDefault(int Id, T entity, string identifier = "Id")
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();

                string selectedColumns = "";
                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (!prop.Name.Contains("_")) {
                        selectedColumns = selectedColumns + convert.ToPascalCase(prop.Name) + " AS " + prop.Name + ",";
                    }
                }

                string query = "Select " + selectedColumns.TrimEnd(',') + " from " + convert.ToPascalCase(entity.GetType().Name) + " Where " + convert.ToPascalCase(identifier) + " = " + Id;                

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                IEnumerable<T> obj = conn.Query<T>(query);

                this.CloseConnection(conn);

                if (obj.Count() !=0)
                {
                    return obj.First();
                }
                else
                {
                    return entity;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public T SingleOrDefaultByCustomField(string Id, string customField, T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();

                string selectedColumns = "";
                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (!prop.Name.Contains("_"))
                    {
                        selectedColumns = selectedColumns + convert.ToPascalCase(prop.Name) + " AS " + prop.Name + ",";
                    }
                }

                string query = "Select " + selectedColumns.TrimEnd(',') + " from " + convert.ToPascalCase(entity.GetType().Name) + " Where "+ convert.ToPascalCase(customField) +" = '" + Id+ "'";

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                IEnumerable<T> obj = conn.Query<T>(query);

                this.CloseConnection(conn);

                if (obj.Count() != 0)
                {
                    return obj.First();
                }
                else
                {
                    return entity;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<T> GetAllByCustomField(string Id, string customField, T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();

                string selectedColumns = "";
                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (!prop.Name.Contains("_"))
                    {
                        selectedColumns = selectedColumns + convert.ToPascalCase(prop.Name) + " AS " + prop.Name + ",";
                    }
                }

                string query = "Select " + selectedColumns.TrimEnd(',') + " from " + convert.ToPascalCase(entity.GetType().Name) + " Where " + convert.ToPascalCase(customField) + " = '" + Id + "'";

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                IEnumerable<T> obj = conn.Query<T>(query);

                this.CloseConnection(conn);

                return obj;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();
                string whereClause = "";
                foreach (var prop in entity.GetType().GetProperties())
                {
                    if(prop.Name.ToLower() == "id")
                    {
                        whereClause = " WHERE ID=" + prop.GetValue(entity, null);
                    }
                }
                string query = "Delete from " + convert.ToPascalCase(entity.GetType().Name) + whereClause;
                var result = ExecuteScaler(query);

                return true;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public T DeleteByCustomField(string id, string customField, T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();
                string whereClause = "";
                foreach (var prop in entity.GetType().GetProperties())
                {
                    if (prop.Name.ToLower() == customField)
                    {
                        whereClause = " WHERE "+ convert.ToPascalCase(customField) + " = " + id;
                    }
                }
                string query = "Delete from " + convert.ToPascalCase(entity.GetType().Name) + whereClause;
                var result = ExecuteScaler(query);

                return entity;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public object GetDropdownList(string label, string value, T entity)
        {
            try
            {
                TextCaseConversion convert = new TextCaseConversion();
                string query = "Select "+label+" as Label, "+value+" as Value from " + convert.ToPascalCase(entity.GetType().Name);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                var list = conn.Query<DropdownListModel>(query);

                this.CloseConnection(conn);
                return list;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public object ExecuteScaler(string query)
        {
            var conn = this.GetConnection();
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }

            var result = conn.Execute(query);

            this.CloseConnection(conn);

            return result;
        }

        public string GetCamelCaseColumnList(T entity)
        {
            TextCaseConversion convert = new TextCaseConversion();
            string selectedColumns = "";
            foreach (var prop in entity.GetType().GetProperties())
            {
                if (!prop.Name.Contains("_"))
                {
                    selectedColumns = selectedColumns + convert.ToPascalCase(prop.Name) + " AS " + prop.Name + ",";
                }
            }

            return selectedColumns.TrimEnd(',');
        }
    }
}
