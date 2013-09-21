/*
 * Copyright (c) 2009-2013 Frank G. Bennett, Jr. All Rights
 * Reserved.
 *
 * The contents of this file are subject to the Common Public
 * Attribution License Version 1.0 (the “License”); you may not use
 * this file except in compliance with the License. You may obtain a
 * copy of the License at:
 *
 * http://bitbucket.org/fbennett/citeproc-js/src/tip/LICENSE.
 *
 * The License is based on the Mozilla Public License Version 1.1 but
 * Sections 1.13, 14 and 15 have been added to cover use of software over a
 * computer network and provide for limited attribution for the
 * Original Developer. In addition, Exhibit A has been modified to be
 * consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an “AS IS”
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is the citation formatting software known as
 * "citeproc-js" (an implementation of the Citation Style Language
 * [CSL]), including the original test fixtures and software located
 * under the ./tests subdirectory of the distribution archive.
 *
 * The Original Developer is not the Initial Developer and is
 * __________. If left blank, the Original Developer is the Initial
 * Developer.
 *
 * The Initial Developer of the Original Code is Frank G. Bennett,
 * Jr. All portions of the code written by Frank G. Bennett, Jr. are
 * Copyright (c) 2009-2013 Frank G. Bennett, Jr. All Rights Reserved.
 *
 * Alternatively, the contents of this file may be used under the
 * terms of the GNU Affero General Public License (the [AGPLv3]
 * License), in which case the provisions of [AGPLv3] License are
 * applicable instead of those above. If you wish to allow use of your
 * version of this file only under the terms of the [AGPLv3] License
 * and not to allow others to use your version of this file under the
 * CPAL, indicate your decision by deleting the provisions above and
 * replace them with the notice and other provisions required by the
 * [AGPLv3] License. If you do not delete the provisions above, a
 * recipient may use your version of this file under either the CPAL
 * or the [AGPLv3] License.”
 */

/*global CSL: true */

CSL.NameOutput.prototype.setEtAlParameters = function () {
    var i, ilen, j, jlen;
    for (i = 0, ilen = this.variables.length; i < ilen; i += 1) {
        var v = this.variables[i];
        if ("undefined" === typeof this.etal_spec[v]) {
            this.etal_spec[v] = {freeters:0,institutions:0,persons:[]};
        }
        this.etal_spec[this.nameset_base + i] = this.etal_spec[v];
        if (this.freeters[v].length) {
            this._setEtAlParameter("freeters", v);
        }
        for (j = 0, jlen = this.persons[v].length; j < jlen; j += 1) {
            if ("undefined" === typeof this.etal_spec[v][j]) {
                this.etal_spec[v].persons[j] = 0;
            }
            this._setEtAlParameter("persons", v, j);
        }
        if (this.institutions[v].length) {
            this._setEtAlParameter("institutions", v);
        }
    }
};

CSL.NameOutput.prototype._setEtAlParameter = function (type, v, j) {
    var lst, count;
    if (type === "persons") {
        lst = this.persons[v][j];
        count = this.persons_count[v][j];
    } else {
        lst = this[type][v];
        count = this[type + "_count"][v];
    }
    if (lst.length < count && !this.state.tmp.sort_key_flag) {
        if (this.etal_use_last) {
            if (type === "persons") {
                this.etal_spec[v].persons[j] = 2
            } else {
                this.etal_spec[v][type] = 2;
            }
        } else {
            if (type === "persons") {
                this.etal_spec[v].persons[j] = 1;
            } else {
                this.etal_spec[v][type] = 1;
            }
        }
    } else {
        if (type === "persons") {
            this.etal_spec[v].persons[j] = 0;
        } else {
            this.etal_spec[v][type] = 0;
        }
    }
};
