from flask import Flask, jsonify, request
from connect import Connect

app = Flask(__name__)


@app.route('/api/test', methods=['GET'])
def test_api():
    return 'HELLO WORLD !'


@app.route('/api/jde', methods=['POST'])
def get_resa():
    data = request.json
    start = data.get('startDate')
    end = data.get('endDate')
    print(start)
    print(end)
    query_jde = (""" 
    SELECT rc.`inv_jde_code`  
    FROM reservation_claim rc 
    INNER JOIN reservation res ON res.`resa_id` = rc.`resa_id` 
    WHERE res.`serv_effected_date` >= '{}' 
    AND res.`serv_effected_date` <= '{}' 
    AND rc.inv_jde_code IS NOT NULL
    AND rc.`inv_jde_code` != ""
    AND rc.`active` = 1  
    AND res.`active` = 1 
    GROUP BY rc.`inv_jde_code` """.format(start, end))
    bd = Connect()
    try:
        sico = bd.sql_query(query_jde)
        data_resa = []
    except Exception as e:
        print("Error to fetch reservation", e)
        return jsonify({"success": False, "Error": "No reservation fetch"})
    else:
        for jde_code in sico:
            data_resa.append({
                'key': str(jde_code[0]),
                'data': {
                    'jde': str(jde_code[0])
                },
                'children': []
            })
            query_serv = ("""
            SELECT rc.`resa_id`, rc.`service_id`, rc.`service_type`,
            rc.`claim_currency`, book.`name`, pay.`name`, LOWER(rc.`description`), rc.`taxable_claim`,
            rc.`claim_total_after_disc`, rc.`invoice_no`
            FROM reservation_claim rc
            INNER JOIN reservation res ON res.`resa_id` = rc.`resa_id` AND res.`active` = 1
            INNER JOIN agency pay ON pay.`id_agency` = rc.`paying_agency_id` AND pay.`active` = 1
            INNER JOIN agency book ON book.`id_agency` = rc.`booking_agency_id` AND book.`active` = 1
            WHERE rc.`inv_jde_code` = {}
            AND res.serv_effected_date >=  '{}'
            AND res.serv_effected_date <=  '{}'
            AND rc.`active` = 1 """.format(jde_code[0], start, end))
            try:
                data_serv_sql = bd.sql_query(query_serv)
            except Exception as e:
                print("Error to fetch reservation", e)
                return jsonify({"success": False, "Error": "No reservation fetch"})
            else:
                for serv in data_serv_sql:
                    data_resa[-1]['children'].append({
                        'key': str(serv[0]),
                        'data': {
                            'resa_id': str(serv[0]),
                            'serv_id': str(serv[1]),
                            'serv_type': str(serv[2]),
                            'serv_curr': str(serv[3]),
                            'serv_book': str(serv[4]),
                            'serv_pay': str(serv[5]),
                            'description': str(serv[6]),
                            'tax_claim': str(serv[7]),
                            'total': str(serv[9]),
                            'serv_inv': str(serv[9]),
                        }
                    })
        return jsonify(data_resa), 200
    finally:
        bd.close()


if __name__ == '__main__':
    app.run(debug=True)
