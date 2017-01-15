<?php

class DB {

    public function __construct() {

        $this -> connection = new mysqli(
            'www.aplica.si:3306',
            'aplica_eizo',
            '{mvss*g^~9Gg',
            'aplica_eizo'
        );

        if ($this -> connection ->connect_errno) {
            echo "Failed to connect to MySQL: (" . $this -> connection->connect_errno . ") " . $this -> connection->connect_error;
        }

        $this -> connection -> set_charset('utf8');

    }

    public function run($sql) {
        if(!$this -> connection -> query($sql)){
            printf("Error: %s<br />" ,$this->connection->error);
            return $this->connection->error;

        }
        return true;
    }

    public function fetch($sql) {
        $data = $this -> connection -> query($sql);
        if ($data === false) {
            return array();
        }

        $result = array();
        while ($row = $data -> fetch_assoc()) {
            foreach ($row as $k => $v) {
                $row[$k] = $v;
            }
            $result[] = $row;
        }

        return $result;

    }

    public function select($fields, $table, $where = array(), $order = '') {

        $sql = sprintf('SELECT %s FROM %s', $fields, $table);

        if (!empty($where)) {
            $conds = array();
            foreach ($where as $k => $v) {
                $v = trim(stripslashes($v));
                $conds[] = "`{$k}` = '{$v}'";
            }
            $sql .= ' WHERE ' . implode(' AND ', $conds);
        }

        if (!empty($order)) {
            $sql .= ' ORDER BY ' . $order;
        }
        return $this -> fetch($sql);

    }

    public function insert($table, $values) {

        foreach ($values as $k => $v) {
            $values[$k] = sprintf("'%s'", $this -> escape($v));
        }

        $sql  = sprintf('INSERT INTO `%s`', $table);
        $sql .= ' (' . implode(', ', array_keys($values)) . ')';
        $sql .= ' VALUES (' . implode(', ', $values) .');';


        return $this -> run($sql);

    }

    public function update($table, $values, $cond) {

        $values_enclosed = array();
        foreach ($values as $k => $v) {
            $values_enclosed[] = sprintf(
                "`%s` = '%s'",
                $k, $this -> escape($v)
            );
        }

        $sql  = sprintf('UPDATE `%s` SET ', $table);
        $sql .= implode(', ', $values_enclosed);
        if (!empty($cond)) {
            $sql .= ' WHERE ' . $cond;
        }
        return $this -> run($sql);

    }

    public function insert_id() {
        return $this -> connection -> insert_id;
    }

    public function escape($val) {
        return $this -> connection -> real_escape_string($val);
    }

    public function disconnect() {
        return $this -> connection -> close();
    }

}

?>